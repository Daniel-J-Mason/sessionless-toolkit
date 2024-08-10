// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sessionless::{PublicKey, Sessionless, Signature, PrivateKey};
use sessionless::hex::{FromHex, IntoHex};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_keys, sign_message, verify])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn generate_keys() -> (String, String) {
    let generator = Sessionless::new();
    (generator.private_key().to_hex(), generator.public_key().to_hex())
}

#[tauri::command]
fn sign_message(private_key: String, message: String) -> String {
    let bytes = hex::decode(private_key).expect("Decoding failed");

    let private_key = match PrivateKey::from_slice(&bytes) {
        Ok(private_key) => private_key,
        Err(_) => return String::from("Invalid private key")
    };

    let generator = Sessionless::from_private_key(private_key);
    generator.sign(message).to_hex()
}

#[tauri::command]
fn verify(public_key: String, signature: String, message: String) -> bool {
    let generator = Sessionless::new();

    let public_key = match PublicKey::from_hex(public_key.as_bytes()) {
        Ok(public_key) => public_key,
        Err(_) => return false
    };
    let signature = match Signature::from_hex(signature) {
        Ok(signature) => signature,
        Err(_) => return false
    };
    generator.verify(message, &public_key, &signature).map_err(|err| println!("Failed to verify the payload: {}", err)).is_ok()
}

#[cfg(test)]
mod tests {
    use crate::{generate_keys, sign_message, verify};

    #[test]
    fn generates_valid_signature() {
        let (private_key, public_key) = generate_keys();
        let signature = sign_message(private_key, String::from("Message"));

        verify(public_key, signature, String::from("Message"));
    }
}
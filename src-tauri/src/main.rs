// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sessionless::{Sessionless};
use sessionless::secp256k1::SecretKey;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_keys, sign_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn generate_keys() -> (String, String) {
    let generator = Sessionless::new();
    (format!("{}", generator.private_key().display_secret()), generator.public_key().to_string())
}

#[tauri::command]
fn sign_message(private_key:String, message:String) -> String{
    let bytes = hex::decode(private_key).expect("Decoding failed");
    let generator = Sessionless::from_private_key(SecretKey::from_slice(&bytes).unwrap());
    generator.sign(message).to_string()
}
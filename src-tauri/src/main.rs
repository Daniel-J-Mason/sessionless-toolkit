// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sessionless::Sessionless;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_keys])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn generate_keys() -> (String, String) {
    let generator = Sessionless::new();
    (format!("{}", generator.private_key().display_secret()), generator.public_key().to_string())
}
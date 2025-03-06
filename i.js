const fs = require('fs');

// Baca file yang sudah di-obfuscate
let obfuscatedCode = fs.readFileSync('cs.js', 'utf8');

// Hapus bagian header dan footer
obfuscatedCode = obfuscatedCode.replace(/\(function\(\)\{[\s\S]*?let hiddenText = `\n/, '');
obfuscatedCode = obfuscatedCode.replace(/\n`;\n\n    function キKINGZONEキ[\s\S]*?\}\)\(\);/, '');

// Konversi zero-width characters kembali ke teks asli
function decodeZeroWidth(text) {
    return text.replace(//g, "0")  // Zero Width Space
               .replace(/‌/g, "1")  // Zero Width Non-Joiner
               .replace(/⁠/g, " ")  // Word Joiner (pemisah)
               .split(" ")
               .map(bin => String.fromCharCode(parseInt(bin, 2)))
               .join("");
}

// Dekode kode asli
let decodedCode = decodeZeroWidth(obfuscatedCode);

// Simpan kembali dalam file baru
fs.writeFileSync('namafile_deobfuscated.js', decodedCode, 'utf8');

console.log('Kode berhasil dikembalikan ke bentuk aslinya!');

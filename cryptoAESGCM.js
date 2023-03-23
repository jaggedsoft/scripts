( async () => {
    const crypto = require( 'crypto' ), { subtle } = crypto.webcrypto;
    const generateKey = async() => await subtle.generateKey( { name: "AES-GCM", length: 256 }, true, [ "encrypt", "decrypt" ] );
    const generateIV = async() => crypto.webcrypto.getRandomValues( new Uint8Array( 12 ) );
    const importKey = async exportedKey => await subtle.importKey( "raw", exportedKey, { name: "AES-GCM", length: 256 }, true, [ "encrypt", "decrypt" ] );
    const exportKey = async key => new Uint8Array( await subtle.exportKey( "raw", key ) );

    async function decryptAESGCM( key, encryptedData ) {
        const iv = encryptedData.slice( 0, 12 ), ciphertext = encryptedData.slice( 12 );
        const decryptedData = await subtle.decrypt( { name: "AES-GCM", iv }, key, ciphertext );
        return new TextDecoder().decode( decryptedData );
    }

    async function encryptAESGCM( key, data ) {
        const iv = await generateIV();
        const encodedData = new TextEncoder().encode( data );
        const encryptedData = await subtle.encrypt( { name: "AES-GCM", iv }, key, encodedData );
        const encryptedDataArray = new Uint8Array( encryptedData );
        const result = new Uint8Array( iv.length + encryptedDataArray.length );
        result.set( iv );
        result.set( encryptedDataArray, iv.length );
        return result;
    }

    /////////////////////////////////////////////////
    
    const key = await generateKey();
    const exportedKey = await exportKey( key );
    console.info( "Exported key:", Buffer.from( exportedKey ).toString( 'hex' ) );

    const data = "This is a secret message!";
    const encryptedData = await encryptAESGCM( key, data );
    console.info( "Encrypted data:", Buffer.from( encryptedData ).toString( 'hex' ) );
    const importedKey = await importKey( exportedKey );
    const decryptedData = await decryptAESGCM( importedKey, encryptedData );
    console.log( "Decrypted data:", decryptedData );
} )();

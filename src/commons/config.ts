export const config = {
    ROOT_URL: "http://localhost/",
    FRONTEND_URL: "http://localhost:4200/",
    MAILER: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
            user: 'nuoinguyen.hva@gmail.com',
            pass: 'gdzmjacqimgtjqex',
        },
        tls: {
            ciphers: 'SSLv3',
        },
    },
    EMAIL_SERVICE : 'nuoinguyen.hva@gmail.com'
};
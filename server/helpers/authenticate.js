require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.generateAccessToken = information => {
    const token = jwt.sign(information, process.env.JWT_SECRET1, { expiresIn: '1d' });
    const token2 = jwt.sign({token:token}, process.env.JWT_SECRET2, { expiresIn: '1d' });
    return token2;
};

exports.certifyAccessToken = async (token) => {
    try {
       const capsuled = await jwt.verify(token, process.env.JWT_SECRET2);
       const result = await jwt.verify(capsuled.token, process.env.JWT_SECRET1);
       return result;
    } catch (error) {
        throw new Error(error.message);
    }
    
    // return new Promise((resolve, reject) => {
    //     jwt.verify(token, process.env.JWT_SECRET1, (err, decoded) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(decoded);
    //         }
    //     });
    // });
};

// exports.generateRefreshToken = information => {
//     const { id, hashedPw } = information;
//     return jwt.sign({ id }, secret + hashedPw, { expiresIn: '7d' });
// };

// exports.certifyRefreshToken = (token, hashedPw) => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, secret + hashedPw, (err, decoded) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(decoded);
//             }
//         });
//     });
// };

// exports.decodedRefreshToken = token => {
//     return new Promise((resolve, reject) => {
//         try {
//             const decoded = jwt.decode(token);
//             resolve(decoded);
//         } catch (err) {
//             reject(err);
//         }
//     });
// };

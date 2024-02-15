import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import CryptoJS from "crypto-js";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    const key = 'key-test_493e9539-3765-493a-864d-1082e2636168';
    const secret = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlfa2V5Ijoia2V5LXRlc3RfNDkzZTk1MzktMzc2NS00OTNhLTg2NGQtMTA4MmUyNjM2MTY4Iiwic2VjcmV0IjoiMDUyOTNjMGU1MDlhOWE4ODRiMDVhMWYwZjkzYjdiNjMzMmE1NDUwMSJ9.is7GgbMLZ_ZUT1He9DG1dtEs5CxfpkVlCco0Xo6mHQY'
    const timeRes = await axios.get('https://yayawallet.com/api/en/time');
    const time = timeRes.data.time;
    const stringPath = time + 'GET/api/en/transaction/search';
    const hash = CryptoJS.HmacSHA256(stringPath, secret);
    const signature = CryptoJS.enc.Base64.stringify(hash);


    try {
        const transRes = await axios.post('https://yayawallet.com/api/en/transaction/search', req.body, {
            headers: {
                "YAYA-API-KEY": key,
                "YAYA-API-TIMESTAMP":time,
                "YAYA-API-SIGN": signature
            }
        })


        res.status(200).json(transRes.data);
    } catch (ex) {
        res.status(res.statusCode).send(res.statusMessage);
    }
}

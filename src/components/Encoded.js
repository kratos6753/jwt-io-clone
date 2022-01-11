import { Form, Col } from 'react-bootstrap';
import styles from './Encoded.module.css';
import useSharedValidityState from './useSharedValidityState';
import useSharedAlgoState from './useSharedAlgoState';
import useSharedSecureHash from './useSharedSecureHash';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import hmacSHA384 from 'crypto-js/hmac-sha384';
import hmacSHA512 from 'crypto-js/hmac-sha512';

import base64url from 'base64url';
import useSharedPayloadState from './useSharedPayloadState';
import useSharedEncodedValue from './useSharedEncodedValue';

export default function Encoded() {

    const { validity, setValidity } = useSharedValidityState()
    const { algo, setAlgo } = useSharedAlgoState()
    const { secret } = useSharedSecureHash()
    const { payload, setPayload } = useSharedPayloadState()
    const { encodedValue, setEncodedValue } = useSharedEncodedValue()
    const hashFns = {
        'HS256': hmacSHA256,
        'HS384': hmacSHA384,
        'HS512': hmacSHA512
    }

    function b64_to_utf8( str ) {
        return decodeURIComponent(escape(window.atob( str )));
    }

    function hexToBase64Url(str) {
        return base64url.fromBase64(btoa(String.fromCharCode.apply(null,
          str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
        ));
    }

    const handleChange = e => {
        setEncodedValue(e.target.value);
        const parts = encodedValue.split(".");
        const filteredParts = parts.filter(el => el.length !== 0);
        if (parts.length !== 3 || filteredParts.length !== 3) {
            e.target.style.backgroundColor = 'red';
            setValidity(false);
            return
        }
        try {
            const payloadJSON = JSON.parse(b64_to_utf8(parts[1]));
            setPayload(payloadJSON);
        } catch (error) {
            e.target.style.backgroundColor = 'red';
            setValidity(false);
            return;
        }
        
        const hashVal = hexToBase64Url(encodeURI(hashFns[algo](parts[0]+"."+parts[1], secret)));

        if (parts[2] === hashVal) {
            e.target.style.backgroundColor = 'white';
            setValidity(true);
        } else {
            e.target.style.backgroundColor = 'red';
            setValidity(false);
        }
    }

    return (
        <Col className='text-center'>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" rows={14} id={styles.encodedTextArea} onChange={handleChange} />
            </Form.Group>
        </Col>
    );
}
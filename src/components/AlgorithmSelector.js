
import { Form, Row, Col } from 'react-bootstrap';
import useSharedAlgoState from './useSharedAlgoState';
import useSharedEncodedValue from './useSharedEncodedValue';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import hmacSHA384 from 'crypto-js/hmac-sha384';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import useSharedSecureHash from './useSharedSecureHash';

import base64url from 'base64url';

export default function AlgorithmSelector() {

    const { algo, setAlgo } = useSharedAlgoState();
    const { encodedValue, setEncodedValue } = useSharedEncodedValue();
    const { secret, setSecret } = useSharedSecureHash()
    const options = ['HS256', 'HS384', 'HS512'];
    const hashFns = {
        'HS256': hmacSHA256,
        'HS384': hmacSHA384,
        'HS512': hmacSHA512
    }

    function hexToBase64Url(str) {
        return base64url.fromBase64(btoa(String.fromCharCode.apply(null,
          str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
        ));
    }

    const handleChange = e => {
        setAlgo(e.target.value);
        const encodedValueParts = encodedValue.split(".");
        const hashVal = hexToBase64Url(encodeURI(hashFns[e.target.value](encodedValueParts[0]+"."+encodedValueParts[1], secret)));
        setEncodedValue(encodedValueParts[0]+"."+encodedValueParts[1]+"."+hashVal);
    }

    return (
        <Col className='text-center'>
            <Form>
                <Form.Group as={Row} className='mb-3' controlId='algorithmSelect'>
                    <Form.Label column sm={{ span: 2, offset: 4 }} >
                        Algorithm
                    </Form.Label>
                    <Col sm="2">
                        <Form.Select aria-label="Default select example" onChange={handleChange} defaultValue={algo}>
                            { options.map(i => <option name="algorithm" value={i} key={i}>{i}</option>) }
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Form>
        </Col>
    );
}
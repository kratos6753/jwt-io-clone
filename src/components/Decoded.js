import { Row, Col, Form } from 'react-bootstrap';
import styles from './Decoded.module.css';
import useSharedAlgoState from './useSharedAlgoState';
import useSharedPayloadState from './useSharedPayloadState';
import useSharedSecureHash from './useSharedSecureHash';

export default function Decoded() {

    const { algo } = useSharedAlgoState()
    const { secret, setSecret } = useSharedSecureHash()
    const algoPayload = {
        "alg": algo,
        "typ": "JWT"
    }

    const { payload } = useSharedPayloadState()

    const algoFuncNames = {
        "HS256": "HMACSHA256",
        "HS384": "HMACSHA384",
        "HS512": "HMACSHA512"
    }

    const handleChange = e => {
        setSecret(e.target.value)
    }

    return (
        <Col className={`${styles.decoded} text-center`}>
            <Row>
                <Col className={styles.headerColumn} md="12">
                    <span>header: </span><span className='small text-muted'>algorithm &amp; token type</span>
                </Col>
                <Col md="12" className={`${styles.data} text-danger`}>
                    <pre>{ JSON.stringify(algoPayload, undefined, 2) }</pre>
                </Col>
                <Col className={styles.headerColumn} md="12">
                    <span>payload: </span><span className='small text-muted'>data</span>
                </Col>
                <Col md="12" className={`${styles.data} text-primary`}>
                    <pre>{ JSON.stringify(payload, undefined, 2) }</pre>
                </Col>
                <Col className={styles.headerColumn} md="12">
                    <span>verify signature</span>
                </Col>
                <Col md="12" className={`${styles.data} text-success ${styles.verifySig}`}>
                    <span>{ `${algoFuncNames[algo]} (` }</span>
                    <span>base64UrlEncode(header) + "." +</span>
                    <span>base64UrlEncode(payload),</span>
                    <Form.Control type='text' placeholder='your-secret-key' value={secret} size="sm" onChange={handleChange} />
                    <span>)</span>
                </Col>
            </Row>
        </Col>
    );
}
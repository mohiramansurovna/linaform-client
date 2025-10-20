import {useCheckServer} from '@/hooks/useCheckServer.ts';
import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

function CheckServer() {
    const {status} = useCheckServer();
    const [show, setShow] = useState(true);
    useEffect(() => {
        if (status) setShow(true);
        if (status == "success") {
            const timeout = setTimeout(() => {
                setShow(false);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [status]);
    return <AnimatePresence>
        {show &&
            <motion.div
                key="success-banner"
                initial={{opacity: 0, y: -10}}
                animate={{
                    opacity: 1, y: 0,
                    backgroundColor: status == "success"
                        ? '#22c55e'
                        : status == "error"
                            ? '#ef4444'
                            : '#facc15',
                    color: '#fff',
                }}
                exit={{opacity: 0, y: -10}}
                transition={{duration: 0.4}}

                className="w-full text-center text-sm font-semibold h-5 fixed z-70 top-0 left-0">
                {status == "success" ? (
                    <p> Yay. Server is running</p>
                ) : status == "pending" ? (
                    <p>
                        Checking server. It may take around 50 seconds to wake up the server.
                    </p>
                ) : status == "error" && (
                    <p>
                        There is an error with server
                    </p>
                )}
            </motion.div>}
    </AnimatePresence>;
}

export default CheckServer;
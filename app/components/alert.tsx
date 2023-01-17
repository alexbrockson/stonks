import { useEffect, useState } from "react";

type Props = { message: string, type: string }

export default function Alert({ message, type }: Props) {
    console.log('type ' + type);
    const [progress, setProgress] = useState<number>(0);
    useEffect(() => {
        let x = 1;
        var interval = setInterval(function () {

            setProgress(x + 1);
            x++;
            if (x > 100) clearInterval(interval);
        }, 20);
    }, []);

    return (
        <>
            {(progress < 100) && (
                <div className="toast toast-top toast-end">
                    <div className={`alert alert-${type}`}>
                        <div>
                            <span>{message}</span>
                            <progress className="progress w-56" value={`${progress}`} max="100"></progress>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
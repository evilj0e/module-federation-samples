import React from 'react';
import Link from 'next/link';

const Typography = (await import("design_system_1_0_0/Typography")).default;
const { colors } = (await import("design_system_1_0_0/constants")).default;

const Page = () => {
    return (
        <>
            <Typography style={{
                margin: "10px",
                padding: "10px",
                textAlign: "center",
                backgroundColor: colors.red,
                color: colors.white
            }}>
                NextJS now can use remote dependencies on both (client and server) !!
            </Typography>
            <Link href="/">Go to main</Link>
        </>
    );
};

export default Page;

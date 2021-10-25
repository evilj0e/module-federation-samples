import React, { Suspense } from 'react';
const Typography = React.lazy(() => import('design_system_1_0_0/Typography'));
const { colors } = (await import("design_system_1_0_0/constants")).default;

const App = () => {
    return (
        <Suspense fallback={'loading...'}>
            <Typography style={{
                margin: "10px",
                padding: "10px",
                textAlign: "center",
                backgroundColor: colors.red,
                color: colors.white
            }}>
                CRA with module federated design system
            </Typography>
        </Suspense>
    );
};

export default App;

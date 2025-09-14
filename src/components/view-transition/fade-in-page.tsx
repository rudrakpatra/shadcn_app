"use client";

import { HTMLMotionProps, motion } from "framer-motion";

const FadeInPage = (props: HTMLMotionProps<"div">) => {
    return (
        <div className="bg-background">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                {...props}
            />
        </div>
    );
};

export default FadeInPage;
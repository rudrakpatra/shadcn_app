'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext, useRef, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

function FrozenRouter(props: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext ?? {});
    const frozen = useRef(context).current;

    if (!frozen) {
        return <>{props.children}</>;
    }

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {props.children}
        </LayoutRouterContext.Provider>
    );
}

const PageTemplate = ({ children }: { children: React.ReactNode }) => {
    const key = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
        );
    }

    return (
        <AnimatePresence mode="sync">
            <motion.div
                key={key}
                initial={mounted ? { opacity: 0, x: "100vw" } : false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100vw" }}
                transition={{ ease: 'easeInOut', duration: 1.25 }}
                className="min-h-screen"
                style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
            >
                <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTemplate;
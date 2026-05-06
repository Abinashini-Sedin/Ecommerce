import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (callback) => {
    const ref = useRef();
    const [hasScrolled, setHasScrolled] = useState(false);

    // Only allow infinite scroll to trigger after the user has scrolled down at least once
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 10) {
                setHasScrolled(true);
                window.removeEventListener('scroll', onScroll);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && hasScrolled) {
                callback();
            }
        });

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [callback, hasScrolled]);

    return ref;
};

export default useInfiniteScroll;
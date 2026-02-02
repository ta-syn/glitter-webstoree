export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-pearl-white">
            <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 border-4 border-champagne-gold/20 border-t-champagne-gold rounded-full animate-spin"></div>
                <p className="mt-4 text-warm-gray animate-pulse font-heading tracking-widest text-sm">LOADING LUXURY</p>
            </div>
        </div>
    );
}

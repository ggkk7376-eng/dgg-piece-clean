export function Footer() {
    return (
        <footer className="w-full bg-dark-600 border-t border-border py-8 text-center">
            <div className="container mx-auto px-5 text-muted-foreground/60 text-sm">
                <p>&copy; {new Date().getFullYear()} DGG Piece. Wszystkie prawa zastrzeżone.</p>
            </div>
        </footer>
    );
}

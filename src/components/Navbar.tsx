export const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-primary/5 via-background to-accent/5 border-b border-border/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              The Smart School
            </h1>
            <p className="text-sm text-muted-foreground">Tomorrow is our Destiny</p>
            <p className="text-xs text-muted-foreground">A Project of The City School</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
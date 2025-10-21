export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
     <html lang="en">
          <head>
            <style>{`
    html {
      scroll-behavior: smooth;
      
    }
            `}</style>
          </head>
  
    
      <body >{children}</body>
   
 
    </html>
  );
}

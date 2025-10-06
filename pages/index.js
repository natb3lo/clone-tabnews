function Home() {

    return (
        
        <div>
        <h1>Olá, amigo, você é um amigo!
        </h1>
        <style jsx>{`
            div{
                height: 100vh;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;

                background-image:
                url('https://images.unsplash.com/photo-1634869258987-f13de2902431?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
                background-size: cover;     
                background-position: center;  
                background-repeat: no-repeat;
            }
            h1{
                text-align: center;
                color: white;
                font-size: 3rem;
                text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
                margin: 0;
                
            }


            `}</style>
        
        </div>

    )

}

export default Home;


function Home() {

    return (
        
        <div>
        <h1>Bleh💨💨
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
                url('/bleh.jpg');
                background-size: cover;     
                background-position: center;  
                background-repeat: no-repeat;
            }
            h1{
                text-align: center;
                color: white;
                font-size: 6rem;
                text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
                margin: 0;
                
            }


            `}</style>
        
        </div>

    )

}

export default Home;


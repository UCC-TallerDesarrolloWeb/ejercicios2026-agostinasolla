import funcionalImg from '../assets/home/funcional.jpg';
import zumbaImg from '../assets/home/zumba.jpg';
import "@styles/Home.scss";
const Home = () => {
    return(
        <div>
            <div className="card-home">
                <div>
                    <img src="/home/taekwondo.jpg" alt="taekwondo" />
                    <h2>Taekwondo</h2>
                </div>
            </div>
            <div>
             <img src="/home/yoga.webp" alt="yoga" />
             <h2>Yoga</h2>
            </div>
            <div>
             <img src={funcionalImg} alt="funcional" />
             <h2>Funcional</h2>
            </div>
            <div>
             <img src={zumbaImg} alt="zumba" />
             <h2>Zumba</h2>
            </div>
        </div>
    )
}

export default Home;
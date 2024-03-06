import './styles.css';

import chipImage from '../../assets/images/chip-tarjeta.png';
import visaImg from '../../assets/images/visa.png';
const CreditCard = ({ name, cardNumber, date }) => {
    const [month, year] = date.split('/').length ? date.split('/') : ['', ''];
    console.log(month); // Resultado: "01"
    console.log(year); // Resultado: "24"
    return (
        <section className="tarjeta" id="tarjeta">
            <div className="delantera">
                <div className="logo-marca" id="logo-marca">
                    <img src={visaImg} alt="visa-img" />
                </div>
                <img src={chipImage} className="chip" alt="" />
                <div className="datos">
                    <div className="grupo" id="numero">

                        {cardNumber == '' ? (
                            <p className="numero">8989-2411-2525-6555</p>
                        ) : (
                            <p className="numero">
                                {cardNumber.slice(0, 4)}-{cardNumber.slice(4, 8)}-
                                {cardNumber.slice(8, 12)}-{cardNumber.slice(12)}
                            </p>
                        )}
                    </div>
                    <div className="flexbox">
                        <div className="grupo" id="nombre">

                            {name == '' ? (
                                <p className="nombre">Jhon Doe</p>
                            ) : (
                                <p className="nombre">{name}</p>
                            )}
                        </div>
                        <div className="grupo" id="expiracion">

                            <p className="expiracion">
                                <span className="mes">{month == " " ? 'mm' : month}</span>
                                / <span className="year">{year == undefined ? "yy" : year}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="trasera">
                <div className="barra-magnetica" />
                <div className="datos">
                    <div className="grupo" id="firma">
                        <p className="label">Firma</p>
                        <div className="firma">
                            <p />
                        </div>
                    </div>
                    <div className="grupo" id="ccv">
                        <p className="label">CCV</p>
                        <p className="ccv" />
                    </div>
                </div>
                <p className="leyenda">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
                    exercitationem, voluptates illo.
                </p>
                <a href="#" className="link-banco">
                    www.tubanco.com
                </a>
            </div>
        </section>
    );
};

export default CreditCard;

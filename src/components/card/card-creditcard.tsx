import './styles/styles.css';
import chipImage from '../../assets/images/chip-tarjeta.png';
import visaImg from '../../assets/images/visa.png';
const CreditCard = ({ name, cardNumber, date }: any) => {
    const [month, year] = date.split('/').length ? date.split('/') : ['', ''];

    return (
        <section className="row" id="row">
            <div className="front-card">
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
                                <span className="mes">{month == ' ' ? 'mm' : month}</span>/{' '}
                                <span className="year">{year == undefined ? 'yy' : year}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreditCard;

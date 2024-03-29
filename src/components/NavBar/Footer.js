import React from 'react';

const Footer = () => {
    return (
        <footer id="pie"> 
			{/* mapa */}
			<div className="div__map--width">
				<iframe title='Mapa' className="footer__maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1642.8978569292613!2d-58.673588060694605!3d-34.55872742637743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbc40e1119923%3A0x4ccb7573c6081f24!2sC.%20Tucum%C3%A1n%20370%2C%20Bella%20Vista%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1645826674923!5m2!1ses-419!2sar" width="100%" height="130%" style={{border:0}} loading="lazy"></iframe>
			</div>
			{/* <!-- info de la empresa --> */}
			<div className="footer__div--margin"> 
				<div className="footer__divdiv--inlineblock">
					<h4 className="txtWhite txtMed fontSpecial">CONTACTO</h4>
					<ul className="txtSmall">
						<li className="footer__ul--margin">Ubicación: C. Tucumán 370, Bella Vista, <br/>Provincia de Buenos Aires</li>
						<li className="footer__ul--margin">Teléfono: +54 9 11 3700-3700</li>
						<li className="footer__ul--margin">Mail: aubier.lentes@gmail.com</li>
					</ul>
				</div>
				<div className=" footer__divdiv--inlineblock">
					{/* <!-- info de redes --> */}
					<h4 className="txtWhite txtMed fontSpecial">NUESTRAS REDES</h4>
						
							<img className="footer__img--width" src="https://firebasestorage.googleapis.com/v0/b/aubier-coderhousereact.appspot.com/o/chiquitos%2Ffacebook1.png?alt=media&token=07278c61-f5d1-49cf-ae0b-a81e3f77c2a6" alt="Aubier en facebook"/>
						
					
							<img className="footer__img--width" src="https://firebasestorage.googleapis.com/v0/b/aubier-coderhousereact.appspot.com/o/chiquitos%2Finstagram1.png?alt=media&token=4eff055a-e575-4713-a22e-138ff34f4c06" alt="Aubier en instagram"/>
						
						
							<h3 className="txtMed footer__newsletter pt-2">Suscribite al newsletter!</h3>
						
				</div>
					{/* <!-- info del envio y pago--> */}
					<h4 className="txtWhite txtMed fontSpecial">ENVÍOS A CABA Y GBA</h4>
					<h5 className="txtSmall2">- Formas de envío -</h5>
					<div id="formasDeEnvio">
					
						<img className="footer__img--margin" src="https://firebasestorage.googleapis.com/v0/b/aubier-coderhousereact.appspot.com/o/chiquitos%2FOCA.png?alt=media&token=62ff6716-9e9d-4146-8376-a7183fcf3d65" alt="OCA, compañia de envios"/>
						<img className="footer__img--margin" src="https://firebasestorage.googleapis.com/v0/b/aubier-coderhousereact.appspot.com/o/chiquitos%2Fcorreoargentino.png?alt=media&token=5595d57f-5c0d-43e2-bfdf-97945239de4f" alt="correo argentino"/>
					
					</div>
					
            </div>
        </footer>
    );
}

export default Footer;

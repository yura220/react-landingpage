import Contact_board from "./Contact_board";
import ContactForm from "./ContactForm";

function MainContact({ subject, id }) {
    return (
        <section id={id}>
            <div className="wrap">
                <h2 className="h1">{subject}</h2>
                <div className="c_left">
                    <div className="c_box">
                        <h3 className="h3">CREATED BY YURA</h3>
                        <p>
                            이 페이지는 외부 연락을 위한 용도입니다.<br />
                            간단한 문의, 협업 제안, 인사 등<br />
                            가볍게 남겨주셔도 괜찮습니다.</p>
                        <p>
                            답변이 필요한 메시지에는 가능한 빠르게 회신드리며,<br />
                            그 외의 메시지도 모두 확인하고 있습니다.<br />
                            언제든 편하게 남겨주세요.
                        </p>
                        <address><span>Email</span>ruddbfk7@gamil.com</address>
                    </div>
                </div>
                <div className="c_right">
                    {/* <Contact_board /> */}
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
export default MainContact;
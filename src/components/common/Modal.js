import React from 'react'
import 'bulma'



class Modal extends React.Component {

  constructor() {
    super()

    this.state = {
      modalOpen: false
    }


    this.toggleModal = this.toggleModal.bind(this)
  }


  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen })
  }



  render(){
    return (
      <div className="container">
        <div className={`modal ${this.state.modalOpen ? 'is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Terms and Conditions</p>
              <button className="delete" aria-label="close" onClick={() => this.setState({ modalOpen: false })}></button>
            </header>
            <section id="modalBody" className="modal-card-body">
              <div id="description">

                <p>This document can be used as the <strong>terms and conditions of use for a website</strong>. It sets out the basis on which a user is granted <strong>access to a website</strong> and can be modified to take account of numerous factors including:</p>
                <ul>
                  <li>whether the website conducts sales</li>
                  <li>whether the website has further policies</li>
                  <li>whether the website can be used for commercial purposes</li>
                  <li>dispute resolution</li>
                  <li>trademark protection</li>
                </ul>
                <p>It should be noted that this document <strong>only includes the terms and conditions of use</strong>. It will refer to and incorporate into its terms other documents if applicable such as a privacy policy and terms and conditions of sale. Indeed, website operators should always consider whether any further documents such as a privacy policy or cookie policy are required. In particular, while this document has been updated to reflect the <strong>General Data Protection Regulation (GDPR) </strong> when used in conjunction with a privacy policy, such documents are <strong>not included</strong> and must be obtained separately.</p>
                <p>Websites using the document should consider and be aware of the <a href="https://ec.europa.eu/consumers/odr/main/?event=main.home.show" target="blank">EU Online Dispute Resolution platform</a><strong>, </strong>which is referred to within the document.</p>
                <p>Additionally, if any <strong>third party services</strong> are used on the site (such as payment providers), consideration must be paid to whether any <strong>further terms</strong> must be added to the document. Typically such terms will be mandated by such services and can be determined through a request to the provider.</p>
                <p>Finally, it should be noted that this document has been created for use by <strong>general, common sites</strong>, which do not present more specific legal issues. If the website has content which is likely to create more specific issues, or is targeted at a sensitive audience, this document is not appropriate for use. In particular, if the website concerns <strong>regulated activities</strong> (including those covered by the Financial Conduct Authority), encourages <strong>dangerous or risky activities</strong>, offers <strong>legally restricted content or products</strong>, or is <strong>aimed at use by children</strong>, this document should not be used.</p>
                <p>&nbsp;</p>
                <p><strong>How to use the document</strong></p>
                <p>In order for the terms and conditions to be legally binding on a user of the website, the user will have to actually be made <strong>aware of them</strong>, and will have to be considered to <strong>agree to them</strong>. So firstly, they will need to be <strong>published on the website</strong>.</p>
                <p>Some websites simply make the <strong>terms and conditions available somewhere</strong> on the site respectively (usually on a separate page, accessible via a hyperlink) and claim that by using the site, users agree to the terms and conditions. This is known as a <strong>browsewrap</strong> agreement.</p>
                <p>Other websites make the user <strong>take positive steps to confirm that they have read, understood and accepted</strong> the terms and conditions. For example, sites might have a popup box that contains the entire terms and conditions. The user has to scroll to the bottom of the terms and conditions and then check a box (that is otherwise unchecked) to say <strong>I have read and understood these terms and conditions and agree to be bound by them</strong>. This is known as a <strong>clickwrap</strong> agreement.</p>
                <p>Other websites make the user <strong>take positive steps to confirm that they have read, understood and accepted</strong> the terms and conditions. For example, sites might have a popup box that contains the entire terms and conditions. The user has to scroll to the bottom of the terms and conditions and then check a box (that is otherwise unchecked) to say <strong>I have read and understood these terms and conditions and agree to be bound by them</strong>. This is known as a <strong>clickwrap</strong> agreement.</p>
                <p>Other websites make the user <strong>take positive steps to confirm that they have read, understood and accepted</strong> the terms and conditions. For example, sites might have a popup box that contains the entire terms and conditions. The user has to scroll to the bottom of the terms and conditions and then check a box (that is otherwise unchecked) to say I have read and understood these terms and conditions and agree to be bound by them. This is known as a <strong>clickwrap</strong> agreement.</p>
                <p>Websites that use clickwrap agreements often also make sure that the <strong>I agree</strong> box appears on the <strong>same page</strong> as the entire terms and conditions (so that the user cannot argue that although they checked the box, they did not actually see the terms and conditions). It is also common for websites to bring <strong>specific terms to the attention of the user</strong> if those terms might be seen as particularly unfair on the user.</p>
                <p>Similarly, <strong>if the terms exclude under 18s</strong> from using the site, it is typical for a website to require the user to <strong>confirm their age</strong> on a separate page or pop-up.</p>
                <p>In addition to these terms and conditions for a website/mobile, business owners who are selling goods or services online will also need <strong>a separate set of terms and conditions for sale of goods, and/or terms and conditions for sale of services</strong> - which explain the rules in relation to any sales made through the website. In addition, business owners who collect any information from users of the website are likely to need a <strong>privacy policy</strong> as well - to explain how the information of the user is collected, stored and used, and if cookies are used, a <strong>cookie policy</strong>. Finally, an <strong>acceptable use policy</strong> may also help set out the ways in which the website may be used.</p>
                <p>&nbsp;</p>
                <p><strong>Any applicable law</strong></p>
                <p>Consumer Rights Act 2015</p>
                <p>Electronic Commerce (EC Directive) Regulations 2002</p>
                <p>The Company, Limited Liability Partnership and Business (Names and Trading Disclosures) Regulations 2015</p>
                <p>Equality Act 2010</p>
                <p>Contracts (Rights of Third Parties) Act 1999</p>
                <p>The Alternative Dispute Resolution for Consumer Disputes (Competent Authorities and Information) Regulations 2015</p>
                <p>Regulation on Consumer ODR (Regulation (EU) no. 524/2013)</p>

                <p>&nbsp;</p><p><strong>Help from a lawyer</strong></p>
                <p>You can choose to <strong>consult a lawyer if you need help.</strong></p>
                <p>The lawyer can answer your questions or help you through the process. You will be offered this option when you complete the document.</p>


                <p>&nbsp;</p><p><strong>How to modify the template</strong></p>	<p>You fill out a form. The document is created before your eyes as you respond to the questions.</p>

                <p>
                    At the end, you receive it in <strong>Word and PDF</strong> formats.You can <strong>modify</strong> it and <strong>reuse</strong> it.</p>
              </div>
            </section>
            <footer className="modal-card-foot">
            </footer>
          </div>
        </div>


        <a role="button"  onClick={this.toggleModal} >
          <span>Terms and Conditions</span>
        </a>

      </div>

    )
  }
}

export default Modal

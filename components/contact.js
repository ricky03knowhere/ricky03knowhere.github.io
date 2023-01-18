const contact = () => {
  return (
    // <!--CONTACT START-->
    `<div id="contact" class="pt-5">
      <h3 class="title text-center mb-4 pt-5">Contact</h3>
      <div class="row mx-3 pt-5">
        <div class="col-md-5">
          <div class="card info p-4 mb-4" data-aos="flip-up" data-aos-delay="200" data-aos-duration="1000">
            <i class="fas fa-envelope fa-3x mb-1"></i>
            <h3 class="mb-4">Contact Me</h3>
            <p>
              <i class="fab fa-whatsapp me-2 font-weight-bold"></i>Whatsapp :
              085861874609
            </p>
            <p><i class="fas fa-at me-2"></i>E-mail : ricky03senju@gmail.com</p>
          </div>
    
          <div class="card location py-3 mt-5 mb-3" data-aos="flip-up" data-aos-delay="500" data-aos-duration="1000">
            <ul class="list-group list-group-flush">
              <li class="list-group-item pb-3">
                <h3><i class="fas fa-map-marker-alt me-2 ms-1"></i>Address</h3>
              </li>
              <li class="list-group-item py-3">Kp.Ciduga RT 02 RW 09</li>
              <li class="list-group-item py-3">Ds.Margahayu, Kec.Leuwigoong</li>
              <li class="list-group-item">
                Kab.Garut 44192 <br />Jawa Barat, Indonesia
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-7">
          <div class="card p-4 message" data-aos="fade-up" data-aos-delay="800" data-aos-duration="1100"
            data-aos-offset="400">
            <h3 class="mb-5 mt-3">
              <i class="fas fa-paper-plane me-4" style="font-size: 48px"></i>Send a message
            </h3>
            <div class="alert alert-info alert-dismissible fade show d-none notif" role="alert">
              <strong>Thanks! </strong>
              I have received your message and I will read it soon...
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
    
            <form name="submit-to-google-sheet">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" name="name" required />
              </div>
              <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" class="form-control" id="email" name="email" required />
              </div>
    
              <div class="form-group row g-3">
                <div class="col-md-6">
                  <label for="phone">Whatsapp</label>
                  <input type="number" class="form-control" id="phone" name="phone" required />
                </div>
                <div class="col-md-6">
                  <label for="phone">Instagram</label>
                  <input type="text" class="form-control" id="ig" name="ig" required />
                </div>
              </div>
              <div class="form-group">
                <label for="msg">Message</label>
                <textarea cols="100" row="0" class="form-control" id="msg" name="message" required></textarea>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary mt-2 btn-submit">
                  <i class="fas fa-paper-plane me-2"></i>Send
                </button>
    
                <button class="btn btn-primary d-none btn-loading" type="button" disabled>
                  <span class="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0797f0" fill-opacity="1"
          d="M0,256L48,261.3C96,267,192,277,288,250.7C384,224,480,160,576,149.3C672,139,768,181,864,213.3C960,245,1056,267,1152,250.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>`
    // <!--CONTACT END-->
  );
};

export default contact;

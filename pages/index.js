import Image from 'next/image'

const Home = () => (
    <div className="portfolio-app">
      {/* NAVBAR START */}
      <div className="navbar-wrapper">
        <nav className="navbar navbar-expand-lg navbar-dark fj-mw9">

          <a className="navbar-brand mr-3 font-weight-bold" href="#">Voice chats</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item mr-3">
                <a className="nav-link" href="#">Voice room</a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                <a className="nav-link" href="#">Sign Up</a>
              </li>
              <li className="nav-item mr-3">
                <a className="nav-link btn btn-success bg-green-2 bright" href="#">Sign In</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* NAVBAR ENDS */}
    

        {/* LOGIN PAGE STARTS */}
        <section className="section-title">
          <div className="px-2">
          </div>
        </section>
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="h3">Sign in</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password" />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning">Submit</button>
              </form>
            </div>
          </div>
        </div>
        {/* LOGIN PAGE ENDS */}
   
  
      {/* FOOTER STARTS */}
      <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
        <div className="container text-center">
          <small>Copyright &copy; Anna Arkhipchuk</small>
        </div>
      </footer>
      {/* FOOTER ENDS */}
    </div>
  )
  
  export default Home
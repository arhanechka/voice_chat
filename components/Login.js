import { useRouter } from 'next/router'

const LoginForm = ()=>(
    <div>
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
  </div>
)

export default LoginForm
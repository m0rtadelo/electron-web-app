export const LOGIN_HTML = `
<div class="container-fluid bg-dark text-light" style="margin-top: 10em;" id="login">
    <form id="loginForm">
      <div class="row justify-content-md-center">
        <div class="col col-sm-4">
          <h1 class="text-center"><strong>E.W.A</strong></h1>
          <div>
            <div class="mb-3">
              <input class="form-control" type="text" id="user" placeholder="Username" autofocus required/>
            </div>
            <div class="mb-3">
              <input class="form-control" type="password" id="pass" placeholder="Password" required/>
            </div>
            <div class="d-grid gap-2">
              <input class="btn btn-primary" type="submit" value="Login">
            </div>
          </div>
          <banner-error></banner-error>
        </div>
      </div>
    </form>
  </div>
`
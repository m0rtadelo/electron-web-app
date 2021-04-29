export const LOGIN_HTML = `
<div class="container-fluid bg-dark text-light" style="margin-top: 10em;" id="login">
  <div class="row justify-content-md-center">
    <div class="col col-sm-4">
      <login></login>
      <banner-error></banner-error>
      <date-hour color="grey" style="position: absolute; width: 100%; left: 0px; bottom: 0px;"></date-hour>
      <app-type id="change" color="red"></app-type>
      <app-type data="testData" onClick="setData(1)"></app-type>
    </div>
  </div>
</div>
`;

export const LOGIN_HTML = `
<lang-picker></lang-picker>
<div class="container-sm" style="margin-top: 10em;" id="login">
  <div class="row justify-content-md-center">
    <div class="col col-sm-4">
      <login></login>
      <app-type id="change" color="grey"></app-type>
      <banner-error></banner-error>
      <date-hour color="grey" click="console.log('view click event', this)"
       style="position: absolute; width: 100%; left: 0px; bottom: 0px;">
      </date-hour>
    </div>
  </div>
</div>
`;

export const LOGIN_HTML = `
<div class="container-fluid" style="margin-top: 10em;" id="login">
  <div class="row justify-content-md-center">
    <div class="col col-sm-4">
      <login></login>
      <banner-error></banner-error>
      <date-hour color="grey" click="console.log('view click event', this)" style="position: absolute; width: 100%; left: 0px; bottom: 0px;"></date-hour>
      <app-type id="change" color="red"></app-type>
      <app-type data="testData" click="this.getEventComponent().test()"></app-type>
      <app-type data="another" click="this.getEventComponent().test()"></app-type>
      <div click="console.log(this)">click me</div>
    </div>
  </div>
</div>
`;

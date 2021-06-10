export const HOME_HTML = `
<div class="container-full">
<app-menu></app-menu>
<table-data id="contacts" data="contacts" headers="name,phone,type" auto="true"></table-data>
<table-data style="display:none;" id="users" headers="user,admin" data="users"></table-data>
<!--<date-hour color="grey" style="position: absolute; width: 100%; left: 0px; bottom: 0px;"></date-hour>-->
<button class="btn btn-primary" click="this.switchCounter()">Switch Counter</button>
</div>
`;

/* eslint-disable max-len */
export const APP_NODE = 'root';
export const ID = 'id';
export const DATA_KEY = 'data';
export const TAG_KEY = 'client.library.content.tag';
export const REQUIRED_HTML = `
<div id="client.library.content.tag"></div>
`;
export const MODAL_HTML = `
<button id="openModal" type="button" style="display: none;" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">$title</h5>
        <button click="this.confirmCancel()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modal-body">
        $msg
      </div>
      <div class="modal-footer">
        <button click="this.confirmCancel()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button click="this.confirmConfirm()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
      </div>
    </div>
  </div>
</div>
`;

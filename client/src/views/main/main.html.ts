export const HTML = `
<table style="width: 100%; height: 100%" cellspacing="0">
<tr style="height: 3em;">
  <td colspan="2">menu</td>
</tr>
<tr>
  <!--<td style="width: 50%; position: absolute; overflow-y: auto; top: 3em; bottom: 6em;">-->
  <td style="width: 50%;">
    <file-explorer id="local"></file-explorer>
  </td>
  <!--<td style="width: 50%; position: absolute; overflow-y: scroll; top: 3em; bottom: 6em; left: 50%;">-->
  <td style="width: 50%; left: 50%;">
    <file-explorer id="remote"></file-explorer>
  </td>
  
</tr>
<tr style="height: 6em; position: absolute; bottom: 0px;">
  <td colspan="2">log</td>
</tr>
</table>
`;

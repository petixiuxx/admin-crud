import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      //   <div className="large-10 medium-10 large-offset-2 medium-offset-2 columns">
      //     <div className="row">
      //       <div className="large-6 columns">
      //         <h4>
      //           <strong className="color-green">Questions</strong>
      //         </h4>
      //       </div>
      //       <div className="large-6 columns margin-bottom10">
      //         <a className="button round small right" href="questions_form.php">
      //           Add new
      //         </a>
      //       </div>
      //     </div>

      //     <div className="row">
      //       <div className="large-12 columns">
      //         <table className="large-12 columns padding0">
      //           <thead>
      //             <tr>
      //               <th width="150">Thumbnail</th>
      //               <th>Title</th>
      //               <th>lable</th>
      //               <th>Tag</th>
      //               <th width="220">Action</th>
      //             </tr>
      //           </thead>
      //           <tbody>
      //             <tr>
      //               <td>
      //                 <img
      //                   className="th"
      //                   src="https://silverportal.co/demo/admin/upload/5c46b9f7d4bcf.PNG"
      //                 />
      //               </td>
      //               <td>តើអ្នកណាដែលតាមស្រលាញ់អ្នក ?</td>
      //               <td>love</td>
      //               <td>New</td>
      //               <td>
      //                 <a
      //                   href="questions_action.php?action=delete&amp;id=160"
      //                   className="button tiny alert btn-excluir radius"
      //                 >
      //                   <i className="fa fa-trash fa-1x" />
      //                   &nbsp;&nbsp;Delete
      //                 </a>
      //                 <a
      //                   href="questions_form.php?action=edit&amp;id=160"
      //                   className="button tiny warning radius"
      //                 >
      //                   <i className="fa fa-pencil fa-1x" />
      //                   &nbsp;&nbsp;Update
      //                 </a>
      //               </td>
      //             </tr>
      //             <tr>
      //               <td>
      //                 <img
      //                   className="th"
      //                   src="https://silverportal.co/demo/admin/upload/5c45b01168449.jpg"
      //                 />
      //               </td>
      //               <td>What is your name in chinese?</td>
      //               <td>600</td>
      //               <td>hot</td>
      //               <td>
      //                 <a
      //                   href="questions_action.php?action=delete&amp;id=158"
      //                   className="button tiny alert btn-excluir radius"
      //                 >
      //                   <i className="fa fa-trash fa-1x" />
      //                   &nbsp;&nbsp;Delete
      //                 </a>
      //                 <a
      //                   href="questions_form.php?action=edit&amp;id=158"
      //                   className="button tiny warning radius"
      //                 >
      //                   <i className="fa fa-pencil fa-1x" />
      //                   &nbsp;&nbsp;Update
      //                 </a>
      //               </td>
      //             </tr>
      //             <tr>
      //               <td>
      //                 <img
      //                   className="th"
      //                   src="https://silverportal.co/demo/admin/upload/5c459e2bb56c7.jpg"
      //                 />
      //               </td>
      //               <td>Which Character of Dhanush Suits you ?</td>
      //               <td>Dhanush</td>
      //               <td>trending</td>
      //               <td>
      //                 <a
      //                   href="questions_action.php?action=delete&amp;id=157"
      //                   className="button tiny alert btn-excluir radius"
      //                 >
      //                   <i className="fa fa-trash fa-1x" />
      //                   &nbsp;&nbsp;Delete
      //                 </a>
      //                 <a
      //                   href="questions_form.php?action=edit&amp;id=157"
      //                   className="button tiny warning radius"
      //                 >
      //                   <i className="fa fa-pencil fa-1x" />
      //                   &nbsp;&nbsp;Update
      //                 </a>
      //               </td>
      //             </tr>
      //             <tr>
      //               <td>
      //                 <img
      //                   className="th"
      //                   src="https://silverportal.co/demo/admin/upload/5c459a7431a13.jpg"
      //                 />
      //               </td>
      //               <td>124</td>
      //               <td>124312</td>
      //               <td>123</td>
      //               <td>
      //                 <a
      //                   href="questions_action.php?action=delete&amp;id=156"
      //                   className="button tiny alert btn-excluir radius"
      //                 >
      //                   <i className="fa fa-trash fa-1x" />
      //                   &nbsp;&nbsp;Delete
      //                 </a>
      //                 <a
      //                   href="questions_form.php?action=edit&amp;id=156"
      //                   className="button tiny warning radius"
      //                 >
      //                   <i className="fa fa-pencil fa-1x" />
      //                   &nbsp;&nbsp;Update
      //                 </a>
      //               </td>
      //             </tr>
      //             <tr>
      //               <td>
      //                 <img
      //                   className="th"
      //                   src="https://silverportal.co/demo/admin/upload/5c3f16c041166.png"
      //                 />
      //               </td>
      //               <td>Which celebrities are you a combination of?</td>
      //               <td>600</td>
      //               <td>123</td>
      //               <td>
      //                 <a
      //                   href="questions_action.php?action=delete&amp;id=152"
      //                   className="button tiny alert btn-excluir radius"
      //                 >
      //                   <i className="fa fa-trash fa-1x" />
      //                   &nbsp;&nbsp;Delete
      //                 </a>
      //                 <a
      //                   href="questions_form.php?action=edit&amp;id=152"
      //                   className="button tiny warning radius"
      //                 >
      //                   <i className="fa fa-pencil fa-1x" />
      //                   &nbsp;&nbsp;Update
      //                 </a>
      //               </td>
      //             </tr>
      //             <tr>
      //               <td>
      //                 <img
      //                   className="th"
      //                   src="https://d3d6oiinyfmfyb.cloudfront.net/content/b22379bc-f2a1-4dce-90b9-08bf39c894f4"
      //                 />
      //               </td>
      //               <td>What would you look like as a cartoon?</td>
      //               <td>600</td>
      //               <td>Hot</td>
      //               <td>
      //                 <a
      //                   href="questions_action.php?action=delete&amp;id=151"
      //                   className="button tiny alert btn-excluir radius"
      //                 >
      //                   <i className="fa fa-trash fa-1x" />
      //                   &nbsp;&nbsp;Delete
      //                 </a>
      //                 <a
      //                   href="questions_form.php?action=edit&amp;id=151"
      //                   className="button tiny warning radius"
      //                 >
      //                   <i className="fa fa-pencil fa-1x" />
      //                   &nbsp;&nbsp;Update
      //                 </a>
      //               </td>
      //             </tr>
      //             <tr>
      //               <td>
      //                 <img
      //                   className="th"
      //                   src="https://d3d6oiinyfmfyb.cloudfront.net/content/730a2e1b-d3df-4d52-a6af-c94d0989f1f0"
      //                 />
      //               </td>
      //               <td>Which dog fits your personality?</td>
      //               <td>600</td>
      //               <td>Trending</td>
      //               <td>
      //                 <a
      //                   href="questions_action.php?action=delete&amp;id=138"
      //                   className="button tiny alert btn-excluir radius"
      //                 >
      //                   <i className="fa fa-trash fa-1x" />
      //                   &nbsp;&nbsp;Delete
      //                 </a>
      //                 <a
      //                   href="questions_form.php?action=edit&amp;id=138"
      //                   className="button tiny warning radius"
      //                 >
      //                   <i className="fa fa-pencil fa-1x" />
      //                   &nbsp;&nbsp;Update
      //                 </a>
      //               </td>
      //             </tr>
      //           </tbody>
      //         </table>
      //       </div>
      //     </div>
      //   </div>
      <div>hello</div>
    );
  }
}

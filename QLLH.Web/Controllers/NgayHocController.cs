using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QLLH.Web.Controllers
{
    using BLL;
    using DAL;
    using Common.Req;
    using Common.Rsp;

    [Route("api/[controller]")]
    [ApiController]
    public class NgayHocController : ControllerBase
    {
        public NgayHocController()
        {
            _svc = new NgayHocSvc();
        }

        [HttpPost("get-by-id")]
        public IActionResult getNgayHocById([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var ng = _svc.getNgayHocById(req.Id);
            res.Data = ng;
            return Ok(res);
        }

        [HttpPost("get-all")]
        public IActionResult getAllNgayHoc()
        {
            var res = new SingleRsp();
            var listNgay = _svc.getAllNgayHoc();
            res.Data = listNgay;
            return Ok(res);
        }

        private readonly NgayHocSvc _svc;
    }
}
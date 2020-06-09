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
    public class TietHocController : ControllerBase
    {
        public TietHocController()
        {
            _svc = new TietHocSvc();
        }

        [HttpPost("get-by-id")]
        public IActionResult getTietHocById([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var ng = _svc.getTietHocById(req.Id);
            res.Data = ng;
            return Ok(res);
        }

        [HttpPost("get-all")]
        public IActionResult getAllTietHoc()
        {
            var res = new SingleRsp();
            var listTiet = _svc.getAllTietHoc();
            res.Data = listTiet;
            return Ok(res);
        }

        private readonly TietHocSvc _svc;
    }
}
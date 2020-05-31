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
    public class MonHocController : ControllerBase
    {
        public MonHocController()
        {
            _svc = new MonHocSvc();
        }

        [HttpPost("get-by-id")]
        public IActionResult getMonHocById([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var mh = _svc.getMonHocById(req.Id);
            res.Data = mh;
            return Ok(res);
        }

        [HttpPost("get-all")]
        public IActionResult getAllMonHoc()
        {
            var res = new SingleRsp();
            var mh = _svc.All;
            res.Data = mh;
            return Ok(res);
        }

        private readonly MonHocSvc _svc;
    }
}
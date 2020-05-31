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
    public class HocSinhController : ControllerBase
    {
        public HocSinhController()
        {
            _svc = new HocSinhSvc();
        }

        [HttpPost("get-by-id")]
        public IActionResult getHocSinhById([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var hs = _svc.getHocSinhById(req.Id);
            res.Data = hs;
            return Ok(res);
        }

        [HttpPost("get-by-name")]
        public IActionResult getHocSinhByName([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var hs = _svc.getHocSinhByName(req.page, req.size, req.keyword);
            res.Data = hs;
            return Ok(res);
        }

        [HttpPost("get-all")]
        public IActionResult getAllHocSinh([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var hs = _svc.getAllHocSinh(req.page, req.size, req.keyword);
            res.Data = hs;
            return Ok(res);
        }

        private readonly HocSinhSvc _svc;
    }
}
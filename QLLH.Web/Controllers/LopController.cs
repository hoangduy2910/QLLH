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
    public class LopController : ControllerBase
    {
        public LopController()
        {
            _svc = new LopSvc();
        }

        [HttpPost("get-by-id")]
        public IActionResult getLopById([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var l = _svc.getLopById(req.Id);
            res.Data = l;
            return Ok(res);
        }

        [HttpPost("get-all-no-detail")]
        public IActionResult getAllLopNoDetail()
        {
            var res = new SingleRsp();
            var listLop = _svc.getAllLopNoDetail();
            res.Data = listLop;
            return Ok(res);
        }

        [HttpPost("get-all")]
        public IActionResult getAllLop(SearchReq req)
        {
            var res = new SingleRsp();
            var listLop = _svc.getAllLop(req.page, req.size, req.keyword);
            res.Data = listLop;
            return Ok(res);
        }

        private readonly LopSvc _svc;
    }
}
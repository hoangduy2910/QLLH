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
    public class GiaoVienController : ControllerBase
    {
        public GiaoVienController()
        {
            _svc = new GiaoVienSvc();
        }

        [HttpPost("get-by-id")]
        public IActionResult getGiaoVienById([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var gv = _svc.getGiaoVienById(req.Id);
            res.Data = gv;
            return Ok(res);
        }

        [HttpPost("get-by-name")]
        public IActionResult getGiaoVienByName([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var gv = _svc.getGiaoVienByName(req.page, req.size, req.keyword);
            res.Data = gv;
            return Ok(res);
        }

        [HttpPost("get-all")]
        public IActionResult getAllGiaoVien([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var gv = _svc.getAllGiaoVien(req.page, req.size, req.keyword);
            res.Data = gv;
            return Ok(res);
        }

        [HttpPost("get-all-no-detail")]
        public IActionResult getAllGiaoVienNoDetail()
        {
            var res = new SingleRsp();
            var gv = _svc.getAllGiaoVienNoDetail();
            res.Data = gv;
            return Ok(res);
        }

        [HttpPost("create")]
        public IActionResult createGiaoVien([FromBody] GiaoVienReq req)
        {
            var res = _svc.createGiaoVien(req);
            return Ok(res);
        }

        [HttpPost("update")]
        public IActionResult updateGiaoVien([FromBody] GiaoVienReq req)
        {
            var res = _svc.updateGiaoVien(req);
            return Ok(res);
        }

        [HttpPost("remove")]
        public IActionResult removeGiaoVien([FromBody] SimpleReq req)
        { 
            var res = _svc.removeGiaoVien(req.Id);
            return Ok(res);
        }

        private readonly GiaoVienSvc _svc; 
    }
}
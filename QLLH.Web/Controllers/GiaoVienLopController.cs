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
    public class GiaoVienLopController : ControllerBase
    {
        public GiaoVienLopController()
        {
            _svc = new GiaoVienLopSvc();
        }

        [HttpPost("get-by-class")]
        public IActionResult getGiaoVienLopTheoLop([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            var listGV = _svc.getGiaoVienLopTheoLop(req.Id);
            res.Data = listGV;
            return Ok(res);
        }

        [HttpPost("get-by-subject-and-class")]
        public IActionResult getGiaoVienLopTheoMonHocVaLop([FromBody] GiaoVienMonHocReq req)
        {
            var res = new SingleRsp();
            var gv = _svc.getGiaoVienLopTheoMonHocVaLop(req);
            res.Data = gv;
            return Ok(res);
        }

        [HttpPost("get-by-teacher-and-class")]
        public IActionResult getGiaoVienLopTheoGiaoVienVaLop([FromBody] GiaoVienLopReq req)
        {
            var res = new SingleRsp();
            var listGV = _svc.getGiaoVienLopTheoGiaoVienVaLop(req);
            res.Data = listGV;
            return Ok(res);
        }

        [HttpPost("create")]
        public IActionResult createGiaoVienLop([FromBody] GiaoVienLopReq req)
        {
            var res = _svc.createGiaoVienLop(req);
            return Ok(res);
        }

        [HttpPost("update")]
        public IActionResult updateGiaoVienLop([FromBody] GiaoVienLopReq req)
        {
            var res = _svc.updateGiaoVienLop(req);
            return Ok(res);
        }

        [HttpPost("remove")]
        public IActionResult removeGiaoVienLop([FromBody] SimpleReq req)
        {
            var res = _svc.removeGiaoVienLop(req.Id);
            return Ok(res);
        }

        private readonly GiaoVienLopSvc _svc;
    }
}
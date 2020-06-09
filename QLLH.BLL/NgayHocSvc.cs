using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.BLL;
using QLLH.Common.Rsp;
using System.Linq;

namespace QLLH.BLL
{
    using DAL;
    using DAL.Models;
    using QLLH.Common.Req;
    public class NgayHocSvc : GenericSvc<NgayHocRep, NgayHoc>
    {
        public override SingleRsp Read(int id)
        {
            var res = new SingleRsp();
            var m = _rep.Read(id);
            res.Data = m;
            return res;
        }

        public object getNgayHocById(int id)
        {
            var ng = All.FirstOrDefault(ng => ng.MaNgay == id);
            return ng;
        }

        public object getAllNgayHoc()
        {
            var listNgay = All;
            return listNgay;
        }
    }
}

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
    public class TietHocSvc : GenericSvc<TietHocRep, TietHoc>
    {
        public override SingleRsp Read(int id)
        {
            var res = new SingleRsp();
            var m = _rep.Read(id);
            res.Data = m;
            return res;
        }

        public object getTietHocById(int id)
        {
            var t = All.FirstOrDefault(t => t.MaTiet == id);
            return t;
        }

        public object getAllTietHoc()
        {
            var listTiet = All;
            return listTiet;
        }
    }
}

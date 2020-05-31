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
    public class MonHocSvc : GenericSvc<MonHocRep, MonHoc>
    {
        public override SingleRsp Read(int id)
        {
            var res = new SingleRsp();
            var m = _rep.Read(id);
            res.Data = m;
            return res;
        }

        public object getMonHocById(int id)
        {
            var mh = All.FirstOrDefault(mh => mh.MaMh == id);
            return mh;
        }
    }
}

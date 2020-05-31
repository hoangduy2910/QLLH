using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using System.Linq;

namespace QLLH.DAL
{
    using Models;
    using QLLH.Common.Rsp;
    public class HocSinhRep : GenericRep<QuanLyLopHocContext, HocSinh>
    {
        public override HocSinh Read(int id)
        {
            // return base.Read(id);
            var res = All.FirstOrDefault(x => x.MaHs == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = All.First(x => x.MaHs == id);
            m = Delete(m);
            return m.MaHs;
        }
    }
}

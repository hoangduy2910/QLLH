using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using System.Linq;

namespace QLLH.DAL
{
    using Models;
    using QLLH.Common.Rsp;
    public class MonHocRep : GenericRep<QuanLyLopHocContext, MonHoc>
    {
        public override MonHoc Read(int id)
        {
            // return base.Read(id);
            var res = All.FirstOrDefault(x => x.MaMh == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = All.First(x => x.MaMh == id);
            m = Delete(m);
            return m.MaMh;
        }
    }
}

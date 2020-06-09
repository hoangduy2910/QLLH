using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using System.Linq;
using QLLH.DAL.Models;

namespace QLLH.DAL
{
    public class TietHocRep : GenericRep<QuanLyLopHocContext, TietHoc>
    {
        public override TietHoc Read(int id)
        {
            // return base.Read(id);
            var res = All.FirstOrDefault(x => x.MaTiet == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = All.First(x => x.MaTiet == id);
            m = Delete(m);
            return m.MaTiet;
        }
    }
}

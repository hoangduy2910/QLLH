using QLLH.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using System.Linq;

namespace QLLH.DAL
{
    using Models;
    using QLLH.Common.Rsp;
    public class GiaoVienLopRep : GenericRep<QuanLyLopHocContext, GiaoVienLop>
    {
        public override GiaoVienLop Read(int id)
        {
            // return base.Read(id);
            var res = All.FirstOrDefault(x => x.MaGvl == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = All.First(x => x.MaGvl == id);
            m = Delete(m);
            return m.MaGvl;
        }
        public SingleRsp CreateGiaoVienLop(GiaoVienLop gvl)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newGVL = context.GiaoVienLop.Add(gvl);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }

        public SingleRsp UpdateGiaoVienLop(GiaoVienLop gvl)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newGVL = context.GiaoVienLop.Update(gvl);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }

        public SingleRsp RemoveGiaoVienLop(GiaoVienLop gvl)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newGVL = context.GiaoVienLop.Remove(gvl);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }
    }
}
